import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LearnerModel, { DimensionValue } from '../models/learner';

@Injectable({
  providedIn: 'root',
})
export class LearnerService {
  constructor(private http: HttpClient) {}

  getByBoard(boardID: string): Promise<LearnerModel> {
    return this.http.get<LearnerModel>('learner/board/' + boardID).toPromise();
  }

  addDimension(modelID: string, dimension: string): Promise<LearnerModel> {
    return this.http
      .post<LearnerModel>(`learner/${modelID}/addDimension`, { dimension })
      .toPromise();
  }

  removeDimension(modelID: string, dimension: string): Promise<LearnerModel> {
    return this.http
      .post<LearnerModel>(`learner/${modelID}/removeDimension`, { dimension })
      .toPromise();
  }

  updateData(
    modelID: string,
    studentID: string,
    assessment: string,
    dimensionValues: DimensionValue[]
  ): Promise<LearnerModel> {
    return this.http
      .post<LearnerModel>(`learner/${modelID}/updateData`, {
        studentID,
        assessment,
        dimensionValues,
      })
      .toPromise();
  }
}
