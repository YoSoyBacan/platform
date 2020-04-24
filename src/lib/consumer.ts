// import { DoneCallback, Job } from 'bull';

// type LocationJobResponse = {
//     position: number[]; // lat, long
//     truckName: string;
//     time: number; // Epoch
//     address: string;
//     battery: number;
//     vehicleId: string;
//     serviceId: string;
//     locationImg: string;
// }
// export function processLocationResponse(job: Job<LocationJobResponse>, done: DoneCallback) {
//     done(null, null);
//     return job.data.address;
// }