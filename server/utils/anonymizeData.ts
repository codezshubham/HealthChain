interface MedicalRecord {
  patientId: string;
  disease: string;
  hospitalName: string;
  date: Date;
  [key: string]: any;
}

const anonymizeData = (records: MedicalRecord[]) => {
  return records.map((record) => ({
    disease: record.disease,
    hospitalName: record.hospitalName,
    date: record.date,

    // remove sensitive info
    // DO NOT include:
    // patientId, name, phone, etc.
  }));
};

export default anonymizeData;