import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema(
  {
    recordType: {
      type: String,
      enum: [
        'X-Ray',
        'CT Scan',
        'Blood Test',
        'ECG',
        'Prescription',
        'Lab Report',
        'Ultrasound',
        'MRI',
        'Biopsy',
        'General Report',
      ],
      required: [true, 'Record type is required'],
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Patient ID is required'],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number, // in bytes
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    recordDate: {
      type: Date,
      required: [true, 'Record date is required'],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'rejected'],
      default: 'submitted',
    },
    notes: {
      type: String,
      default: '',
    },
    isShared: {
      type: Boolean,
      default: false,
    },
    sharedWith: [
      {
        doctorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        sharedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for common queries
medicalRecordSchema.index({ patientId: 1 });
medicalRecordSchema.index({ doctorId: 1 });
medicalRecordSchema.index({ recordType: 1 });
medicalRecordSchema.index({ recordDate: -1 });
medicalRecordSchema.index({ status: 1 });
medicalRecordSchema.index({ patientId: 1, createdAt: -1 });

// Middleware to populate references
medicalRecordSchema.pre(/^find/, function (next) {
  if (this.options._recursed) return next();
  this.populate({ path: 'patientId', select: 'firstName lastName email' });
  this.populate({ path: 'doctorId', select: 'firstName lastName email specialization' });
  next();
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

export default MedicalRecord;
