import mongoose from 'mongoose';
import Board, { BoardModel, BoardScope } from '../models/Board';
import dalTrace from './dalTrace';
import dalPost from './dalPost';
import dalWorkflow from './dalWorkflow';
import dalNotification from './dalNotification';
import dalBucket from './dalBucket';
import dalProject from './dalProject';
import dalTag from './dalTag';
import dalComment from './dalComment';
import dalVote from './dalVote';
import dalLearnerModel from './dalLearnerModel';

export const getById = async (id: string) => {
  try {
    const board = await Board.findOne({ boardID: id });
    return board;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  }
};

export const getMultipleByIds = async (
  ids: string[],
  filter?: Partial<BoardModel>
) => {
  try {
    const boards = await Board.find({ ...filter, boardID: { $in: ids } });
    return boards;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  }
};

export const getByProject = async (projectID: string) => {
  try {
    const boards = await Board.find({ projectID });
    return boards;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  }
};

export const getPersonal = async (projectID: string, ownerID: string) => {
  try {
    const board = await Board.findOne({
      ownerID,
      projectID,
      scope: BoardScope.PROJECT_PERSONAL,
    });
    return board;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  }
};

export const getAllPersonal = async (projectID: string) => {
  try {
    const boards = await Board.find({
      projectID,
      scope: BoardScope.PROJECT_PERSONAL,
    });
    return boards;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  }
};

export const create = async (board: BoardModel) => {
  try {
    const savedBoard = await Board.create(board);
    await dalLearnerModel.createDefaultModels(board.projectID, board.boardID);
    return savedBoard;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  }
};

export const update = async (id: string, board: Partial<BoardModel>) => {
  try {
    const updatedBoard = await Board.findOneAndUpdate({ boardID: id }, board, {
      new: true,
    });
    return updatedBoard;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  }
};

export const updateMany = async (ids: string[], board: Partial<BoardModel>) => {
  try {
    await Board.updateMany({ boardID: ids }, board);
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  }
};

export const remove = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const deletedBoard = await Board.findOneAndDelete({ boardID: id });
    if (deletedBoard) {
      await dalPost.removeByBoard(id);
      await dalComment.removeByBoard(id);
      await dalBucket.removeByBoard(id);
      await dalNotification.removeByBoard(id);
      await dalTag.removeByBoard(id);
      await dalTrace.removeByBoard(id);
      await dalWorkflow.removeByBoard(id);
      await dalVote.removeByBoard(id);
      await dalProject.removeBoard(deletedBoard?.projectID, id);
    }
    return deletedBoard;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, ' '));
  } finally {
    await session.endSession();
  }
};

const dalBoard = {
  getById,
  getMultipleByIds,
  getByProject,
  getPersonal,
  getAllPersonal,
  create,
  update,
  updateMany,
  remove,
};

export default dalBoard;
