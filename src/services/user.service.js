import {
  responseFromUser,
  responseReview,
  responseMission,
  responseUserMission,
  responseFromReviews,
  responseFromMissions,
  resopnseFromUserInfo,
} from "../dtos/user.dto.js";
import { DuplicateUserEmailError, NoExistStoreError, DuplicateUserMissionError,} from "../error.js";
import {
  addMission,
  getMission,
  addReview,
  getReview,
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  addUserMission,
  getUserMission,
  getAllStoreReviews,
  getAllUserReviews,
  getAllStoreMissions,
  getUserMissionId,
  updatedMissionComplete,
  updateUserInformation,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);


  return responseFromUser({ user, preferences });
};

export const postReview = async (data) => {
  const joinReview = await addReview({
    user_id: data.user_id,
    store_id: data.store_id,
    score: data.score,
    content: data.content,
  });

  if (joinReview == null) {
    throw new NoExistStoreError("존재하지 않는 식당입니다.", data);
  }

  const review = await getReview(joinReview);

  return responseReview(review);

};

export const postMission = async (data) => {
  const joinMission = await addMission({
    store_id: data.store_id,
    name: data.name,
    point: data.point,
    deadline: data.deadline,
    description: data.description,
  });

  if (joinMission == null) {
    throw new NoExistStoreError("존재하지 않는 식당입니다.", data);
  }


  const mission = await getMission(joinMission);

  return responseMission(mission);
};

export const postUserMission = async (data) => {
  const joinUserMission = await addUserMission({
    user_id: data.user_id,
    mission_id: data.mission_id,
  });

  if (joinUserMission == null) {
    throw new DuplicateUserMissionError("이미 도전한 미션입니다.", data);
  }

  const userMission = await getUserMission(joinUserMission);

  return responseUserMission(userMission);
};

export const listStoreReviews = async (store_id, cursor) => {
  const reviews = await getAllStoreReviews(store_id, cursor);
  return responseFromReviews(reviews);
};

export const listUserReviews = async (userId, cursor) => {
  const reviews = await getAllUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};

export const listStoreMissions = async (storeId, cursor) => {
  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMissions(missions);
};

export const completeUserMission = async(userId, missionId) => {
  const userMissionId = await getUserMissionId(userId,missionId);
  
  const mission = await updatedMissionComplete(userMissionId);

  return responseUserMission(mission);
}

export const editUserInformations = async(data) => {
  
  const user = await updateUserInformation(data);
  console.log("user info in service :" , user);
  return resopnseFromUserInfo(user);
}