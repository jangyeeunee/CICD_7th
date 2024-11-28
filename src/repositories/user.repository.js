import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {

  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });

  return created.id;

};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

//review 데이터 삽입
export const addReview = async (data) => {

  const store = await prisma.store.findFirst({ where: { id: data.store_id } });

  if (!store) {
    return null;
  }

  const created = await prisma.userStoreReview.create({
    data: {
      userId: data.user_id,
      storeId: data.store_id,
      score: data.score,
      content: data.content,
    }
  });

  return created.id;

};

// 리뷰 정보 얻기
export const getReview = async (reviewId) => {

  const review = await prisma.userStoreReview.findFirstOrThrow({
    select: {
      id: true,
      content: true,
      store: {
        select: {
          name: true, 
        },
      },
      user: {
        select: {
          name: true, 
        },
      },
    },
    where: {
      id: reviewId,
    },
  });

  console.log(review);

  return review;
};

//mission 데이터 삽입
export const addMission = async (data) => {

  const store = await prisma.store.findFirst({ where: { id: data.storeId } });

  if (!store) {
    return null;
  }

  console.log(data);

  const created = await prisma.mission.create({ 
    data: {
      storeId: data.store_Id,
      name: data.name,
      point: data.point,
      description: data.description,
      deadline: data.deadline,
      store: {
        connect: { id: data.store_id }
      }
    }});

  return created.id;
  
};

//미션 정보 얻기
export const getMission = async (missionId) => {

  const mission = await prisma.mission.findFirstOrThrow({ where : {id: missionId}});
  return mission;
  
};

//사용자 미션 도전 데이터 삽입
export const addUserMission = async (data) => {

  const mission = await prisma.mission.findFirst({ where: { id: data.mission_id } });

  if (mission) {
    return null;
  }

  const created = await prisma.userMission.create({ 
    data: {
      mission:{
        connect: {id: data.mission_id}
      },
      user: {
        connect: { id: data.user_id }
      },
      complete: 0,
    }
    });

  return created.id;

};

//사용자 미션 도전 정보 얻기
export const getUserMission = async (userMissionId) => {
  
  const userMission = await prisma.userMission.findFirstOrThrow({
    select: {
      id: true,
      mission: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true, 
        },
      },
    },
    where: {
      id: userMissionId,
    },
  });

  return userMission;

};

export const getAllStoreReviews = async (store_id, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { 
      id: true, 
      content: true, 
      store: { select: { id: true, name: true } }, 
      user: { select: { id: true, name: true } }    
    },
    where: { storeId: store_id, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });
  
  return reviews;
};

export const getAllUserReviews = async (userId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, content: true, store: { select: { name: true } }, 
    user: { select: { name: true } }  },
    where: { userId: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: { id: true, name: true, store: true, description: true, point: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};

export const getUserMissionId = async (userid, missionid) => {
  const userMission = await prisma.userMission.findFirst({ where: { userId: parseInt(userid), missionId: parseInt(missionid)  }});

  return userMission.id;
};

export const updatedMissionComplete = async (missionId) => {
  const updatedMission = await prisma.userMission.update({
    where: {
      id: missionId,
    },
    data: {
      complete: 1,  
    },
  });

  const userMission = getUserMission(updatedMission.id);
  console.log(userMission);
  return userMission;  
};

export const updateUserInformation = async (data) => {
  const updateUserInfo = await prisma.user.update({
    where: {
      id: data.user_id
    },
    data: {
      gender: data.gender,
      address: data.address,
      detailAddress: data.detailAddress,
      birth: data.birth,
      phoneNumber: data.phoneNumber,
    },
  })
  console.log(updateUserInfo);
  const user = getUser(updateUserInfo.id);
  return user;
};
