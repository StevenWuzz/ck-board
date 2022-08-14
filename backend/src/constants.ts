export enum SocketEvent {
  POST_CREATE = 'POST_CREATE',
  POST_UPDATE = 'POST_UPDATE',
  POST_DELETE = 'POST_DELETE',

  POST_UPVOTE_ADD = 'POST_UPVOTE_ADD',
  POST_UPVOTE_REMOVE = 'POST_UPVOTE_REMOVE',

  POST_COMMENT_ADD = 'POST_COMMENT_ADD',
  POST_COMMENT_REMOVE = 'POST_COMMENT_REMOVE',

  POST_TAG_ADD = 'POST_TAG_ADD',
  POST_TAG_REMOVE = 'POST_TAG_REMOVE',

  POST_START_MOVE = 'POST_START_MOVE',
  POST_STOP_MOVE = 'POST_STOP_MOVE',
  POST_READ = 'POST_READ',

  BOARD_NAME_UDPATE = 'BOARD_NAME_UDPATE',
  BOARD_IMAGE_UPDATE = 'BOARD_IMAGE_UPDATE',
  BOARD_PERMISSIONS_UPDATE = 'BOARD_PERMISSIONS_UPDATE',
  BOARD_TASK_UPDATE = 'BOARD_TASK_UPDATE',
  BOARD_TAGS_UPDATE = 'BOARD_TAGS_UPDATE',
  BOARD_UPVOTE_UPDATE = 'BOARD_UPVOTE_UPDATE',
  BOARD_CLEAR = 'BOARD_CLEAR',

  BUCKET_ADD_POST = 'BUCKET_ADD_POST',
  BUCKET_REMOVE_POST = 'BUCKET_REMOVE_POST',

  VOTES_CLEAR = 'VOTES_CLEAR',

  WORKFLOW_RUN_DISTRIBUTION = 'WORKFLOW_RUN_DISTRIBUTION',
  WORKFLOW_RUN_TASK = 'WORKFLOW_RUN_TASK',
  WORKFLOW_PROGRESS_UPDATE = 'WORKFLOW_PROGRESS_UPDATE',

  NOTIFICATION_CREATE = 'NOTIFICATION_CREATE',
  TRACING_ENABLED = 'TRACING_ENABLED',
  TRACING_DISABLED = 'TRACING_DISABLED',
}

export const POST_COLOR = '#FFE663';

export const POST_DEFAULT_OPACITY = 1;
export const POST_DEFAULT_BORDER = 'black';
export const POST_DEFAULT_BORDER_THICKNESS = 2;

export const POST_TAGGED_BORDER_THICKNESS = 4;

export const POST_MOVING_FILL = '#999999';
export const POST_MOVING_OPACITY = 0.5;
