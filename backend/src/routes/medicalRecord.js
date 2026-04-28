import express from 'express';
import MedicalRecord from '../models/medicalRecord.js';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import { uploadSingleFile, handleUploadError, deleteUploadedFile } from '../middleware/upload.js';

const router = express.Router();

/**
 * POST /api/medical-records
 * Upload a new medical record
 */
router.post(
  '/',
  authenticateToken,
  uploadSingleFile,
  handleUploadError,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file',
        });
      }

      const {
        recordType,
        title,
        description,
        recordDate,
        tags,
        patientId, // Optional, defaults to current user if patient
      } = req.body;

      // Determine patient ID
      let targetPatientId = req.user.userId;
      if (req.user.userType === 'doctor' && patientId) {
        targetPatientId = patientId;
      }

      const newRecord = new MedicalRecord({
        recordType,
        patientId: targetPatientId,
        doctorId: req.user.userType === 'doctor' ? req.user.userId : null,
        title,
        description,
        fileUrl: `/uploads/${req.file.filename}`,
        fileName: req.file.filename,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        recordDate: recordDate || new Date(),
        tags: tags ? (Array.isArray(tags) ? tags : tags.split(',')) : [],
        status: 'submitted',
      });

      await newRecord.save();

      res.status(201).json({
        success: true,
        message: 'Medical record uploaded successfully',
        data: newRecord,
      });
    } catch (error) {
      console.error('Upload error:', error);
      // Clean up file if DB save fails
      if (req.file) {
        deleteUploadedFile(req.file.filename);
      }
      res.status(500).json({
        success: false,
        message: 'Failed to upload medical record',
        error: error.message,
      });
    }
  }
);

/**
 * GET /api/medical-records/patient
 * Get all medical records for the authenticated patient
 */
router.get(
  '/patient',
  authenticateToken,
  authorizeRole(['patient']),
  async (req, res) => {
    try {
      const records = await MedicalRecord.find({ patientId: req.user.userId })
        .sort({ recordDate: -1 });

      res.json({
        success: true,
        count: records.length,
        data: records,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch medical records',
        error: error.message,
      });
    }
  }
);

/**
 * GET /api/medical-records/patient/:patientId
 * Get all medical records for a specific patient (Doctor only)
 */
router.get(
  '/patient/:patientId',
  authenticateToken,
  authorizeRole(['doctor']),
  async (req, res) => {
    try {
      const records = await MedicalRecord.find({ patientId: req.params.patientId })
        .sort({ recordDate: -1 });

      res.json({
        success: true,
        count: records.length,
        data: records,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch medical records',
        error: error.message,
      });
    }
  }
);

/**
 * GET /api/medical-records/:id
 * Get a specific medical record
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found',
      });
    }

    // Authorization check
    if (
      req.user.userType === 'patient' &&
      record.patientId._id.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to access this record',
      });
    }

    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch medical record',
      error: error.message,
    });
  }
});

/**
 * DELETE /api/medical-records/:id
 * Delete a medical record
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found',
      });
    }

    // Authorization check: only the patient themselves or the doctor who uploaded it can delete
    const isOwner = record.patientId._id.toString() === req.user.userId;
    const isUploader = record.doctorId && record.doctorId._id.toString() === req.user.userId;

    if (!isOwner && !isUploader) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to delete this record',
      });
    }

    // Delete file from storage
    deleteUploadedFile(record.fileName);

    // Delete from DB
    await MedicalRecord.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Medical record deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete medical record',
      error: error.message,
    });
  }
});

export default router;
