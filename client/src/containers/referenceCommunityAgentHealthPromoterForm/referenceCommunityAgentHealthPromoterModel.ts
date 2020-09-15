export interface CreateReferenceACSPSForm{
    date: Date;
	community: string;
	patientId: string;
	motive: string;
	referrer: string;
	referrerPhone: string;
	referrerEmail: string;
	actionTaken: string;
	originHfId: string;
	destinationHfId: string;
}

export interface ReferenceACSPSForm{
    Id: number;
    date: Date;
	community: string;
	patientId: string;
	motive: string;
	referrer: string;
	referrerPhone: string;
	referrerEmail: string;
	actionTaken: string;
	originHfId: string;
	destinationHfId: string;
}

export interface Reference{
    codeform: number;
    origin: string;
    destination: string;
}