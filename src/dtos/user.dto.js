export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

export const bodyToReview = (body) => {
  return {
    user_id: body.user_id,
    store_id: body.store_id,
    score: body.score,
    content: body.content,  
  };
};

export const responseReview = (body) => {

  return {
    store_name: body.store,
    user_name: body.user,
    content: body.content,
  };

};

export const bodyToMission = (body) => {
  const deadline = new Date(body.deadline);
  console.log(body);
  return {
    store_id: body.store_id,
    name: body.name,
    description: body.description,
    point: body.point,
    deadline: deadline,
  };

};

export const responseMission = (body) => {

  return {
    store_name: body.store_name,
    name: body.name,
    description: body.description,
    deadline: body.deadline,
    point: body.point,
  };
};

export const bodyToUserMission = (body) => {
  return {
    user_id: body.user_id,
    mission_id: body.mission_id,
  };
};

export const responseUserMission = (body) => {
  return {
    user_name: body.user,
    mission_name: body.mission,
    mission_description: body.mission_description,
  };
};

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

export const responseFromMissions = (missions) => {
  return{
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  }
};

export const bodyToUserInfo = (user_id,body) => {
  
    
    const birth = new Date(body.birth);
    
    return {
      user_id: Number(user_id),
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
    };
  };

export const resopnseFromUserInfo = (body) => {
  return {
    name: body.name,
    gender: body.gender,
    birth: body.birth,
    address: body.address,
    detailAddress: body.detailAddress,
    phoneNumber: body.phoneNumber,
  };
};