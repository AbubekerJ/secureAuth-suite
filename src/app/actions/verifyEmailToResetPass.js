'use server'

import { prisma } from '../utils/connect';
import { sendMail } from '../api/helper/mailer';

export const verifyEmailToResetPass = async (formData) => {

  try {
    const email = formData.get('email');
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await sendMail(user.id, user.email, 'RESET');

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};
