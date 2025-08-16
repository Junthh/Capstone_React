import z from "zod";

export const zRadio = z.boolean().optional();

export const zUrl = z
  .string()
  .nonempty("vui long nhap thong tin")
  .regex(
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    "vui long nhap dung dinh dang"
  );

export const zDate = z.any().optional();

export const zNN = z.string().nonempty("Vui lòng nhập thông tin");

export const zPoint = z
  .string()
  .regex(/^([0-9]|10)$/gm, "Vui lòng nhập từ 0 - 10");

export const zImg = z.any();

export const zBoolean = z.boolean().optional();

