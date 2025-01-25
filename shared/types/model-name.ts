import { Prisma } from "@prisma/client";

export type ModelName =
  | "user"
  | "property"
  | "apartment"
  | "tenantApartment"
  | "transaction"
  | "utilityBill"
  | "propertyHistory"
  | "landlord"
  | "agent"
  | "tenant"
  | "publishApartment";
export type IncludeArgs =
  | Prisma.UserInclude
  | Prisma.PropertyInclude
  | Prisma.ApartMentInclude
  | Prisma.TenantApartmentInclude
  | Prisma.PropertyHistoryInclude
  | Prisma.TransactionInclude
  | Prisma.UtilityBillInclude
  | Prisma.LandlordInclude
  | Prisma.AgentInclude
  | Prisma.TenantInclude
  | Prisma.PublishApartmentInclude;
export type SelectArgs =
  | Prisma.UserSelect
  | Prisma.PropertySelect
  | Prisma.ApartMentSelect
  | Prisma.TenantApartmentSelect
  | Prisma.PropertyHistorySelect
  | Prisma.TransactionSelect
  | Prisma.UtilityBillSelect
  | Prisma.LandlordSelect
  | Prisma.AgentSelect
  | Prisma.TenantSelect;
export type WhereInput =
  | Prisma.UserWhereInput
  | Prisma.PropertyWhereInput
  | Prisma.ApartMentWhereInput
  | Prisma.TenantApartmentWhereInput
  | Prisma.PropertyHistoryWhereInput
  | Prisma.TransactionWhereInput
  | Prisma.UtilityBillWhereInput
  | Prisma.LandlordWhereInput
  | Prisma.AgentWhereInput
  | Prisma.TenantWhereInput
  | Prisma.PublishApartmentWhereInput;
