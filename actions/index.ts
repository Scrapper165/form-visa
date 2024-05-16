"use server";

import { prisma } from "@/lib/db";
import { UserInfo } from "@prisma/client";

export const checkReuseableData = async (data: {
  visa_to_country: string;
  email: string;
}) => {
  return await prisma.userInfo.findFirst({
    where: {
      email: data.email,
      visa_to_country: data.visa_to_country,
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const createNewRecord = async (data: {
  email: string;
  visa_to_country: string;
}) => {
  try {
    return await prisma.userInfo.create({
      data,
    });
  } catch (e) {
    if (e instanceof Error)
      prisma.errorLog.create({ data: { message: e.message } });
  }
};

export const saveData = async (data: Partial<UserInfo>) => {
  try {
    let rs;
    if (data.id) {
      rs = await prisma.userInfo.update({
        data,
        where: {
          id: data.id,
        },
      });
    } else {
      rs = await prisma.userInfo.create({
        data: data,
      });
    }
    return "ok";
  } catch (e) {
    throw e;
    // if (e instanceof Error)
    //   prisma.errorLog.create({ data: { message: e.message } });
    // return "Some error ";
  }
};
