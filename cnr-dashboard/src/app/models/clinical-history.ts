import * as moment from 'moment';

export class MedicalHistory {
    medicalHistoryId!: number;
    comments!: string;
    createDate!: string;
    updateDate!: string | null;
    createdBy!: string;
    updatedBy!: string;

    constructor(medicalHistory?: MedicalHistory) {
        if(medicalHistory) {
            this.medicalHistoryId = medicalHistory.medicalHistoryId;
            this.comments = medicalHistory.comments;
            this.createDate = moment(medicalHistory.createDate).format('DD/MM/YYYY HH:mm');
            this.createdBy = medicalHistory.createdBy;
            this.updateDate = medicalHistory.updateDate ? moment(medicalHistory.updateDate).format('DD/MM/YYYY HH:mm'): null;
            this.updatedBy = medicalHistory.updatedBy;
        } else {
            this.medicalHistoryId = 0;
            this.comments = '';
            this.createDate = '';
            this.createdBy = '';
            this.updateDate = '';
            this.updatedBy ='';
        }

        
    }
}