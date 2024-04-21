export const api = {
  baseUrl: `${process.env.API_BASE_URL}`,
  user: {
    index: `${process.env.API_BASE_URL}/user`,
    reqPasswordReset: `${process.env.API_BASE_URL}/user`,
    resetPassword: `${process.env.API_BASE_URL}/authentication`,
    list: `${process.env.API_BASE_URL}/user/list`,
    checkDuplication: `${process.env.API_BASE_URL}/user/check-duplication`,
  },

  application: {
    candidate: `${process.env.API_BASE_URL}/application`,
    updateStatus: `${process.env.API_BASE_URL}/application/updateStatus`,
    candidateList: `${process.env.API_BASE_URL}/application/list`,
  },
  student: {
    index: `${process.env.API_BASE_URL}/student`,
    result: `${process.env.API_BASE_URL}/student/result`,
  },
  teacher: {
    index: `${process.env.API_BASE_URL}/teacher`,
  },
  personnalAdmin: {
    index: `${process.env.API_BASE_URL}/administration`,
    personalAdminList: `${process.env.API_BASE_URL}/administration/list`,
  },
  group: {
    index: `${process.env.API_BASE_URL}/group`,
    list: `${process.env.API_BASE_URL}/group/all`,
  },
  role: {
    index: `${process.env.API_BASE_URL}/role`,
    list: `${process.env.API_BASE_URL}/role/all`,
    RoleList: `${process.env.API_BASE_URL}/role/list`,
  },
  event: {
    index: `${process.env.API_BASE_URL}/events`,
    list: `${process.env.API_BASE_URL}/events/all`,
    EventList: `${process.env.API_BASE_URL}/events/list`,
  },
  auth: {
    login: `${process.env.API_BASE_URL}/authentication/login`,
    validation: `${process.env.API_BASE_URL}/authentication/validation`,
  },
  educationalClass: {
    index: `${process.env.API_BASE_URL}/educational-classes`,
    list: `${process.env.API_BASE_URL}/educational-classes/all`,
    educationalClassList: `${process.env.API_BASE_URL}/educational-classes/list`,
  },
  privilege: {
    index: `${process.env.API_BASE_URL}/privilege/all`,
  },
  password: {
    request: `${process.env.API_BASE_URL}/user/request-password-reset`,
    reset: `${process.env.API_BASE_URL}/user/reset-password`,
  },
  cursus: {
    index: `${process.env.API_BASE_URL}/cursus`,
  },
  image: {
    index: `${process.env.API_BASE_URL}`,
    profile: `${process.env.API_BASE_URL}/image/profile`,
  },
  file: {
    index: `${process.env.API_BASE_URL}/files`,
  },
  history: {
    index: `${process.env.API_BASE_URL}/history`,
    list: `${process.env.API_BASE_URL}/history/all`,
  },
  comment: {
    index: `${process.env.API_BASE_URL}/commentary`,
    target: `${process.env.API_BASE_URL}/commentary/target`,
    updateComment: `${process.env.API_BASE_URL}/commentary/updateCommentary`,
  },
  course: {
    index: `${process.env.API_BASE_URL}/course`,
    list: `${process.env.API_BASE_URL}/course/all`,
    bySessionId: `${process.env.API_BASE_URL}/course/sessionId`,
    byTeacherUserId: `${process.env.API_BASE_URL}/course/user`,
  },
  session: {
    index: `${process.env.API_BASE_URL}/session`,
    list: `${process.env.API_BASE_URL}/session/all`,
    getByClasseId: `${process.env.API_BASE_URL}/session/classeId`,
  },
  count: {
    index: `${process.env.API_BASE_URL}/count`,
  },
  registrationPeriod: {
    index: `${process.env.API_BASE_URL}/registration-period`,
  },
  question: {
    index: `${process.env.API_BASE_URL}/question`,
    list: `${process.env.API_BASE_URL}/question/list`,
  },
  quizSession: {
    index: `${process.env.API_BASE_URL}/quizSession`,
    list: `${process.env.API_BASE_URL}/quizSession/list`,
  },
};
