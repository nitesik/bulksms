import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AllMessages {
  @Field()
  id: string;

  @Field()
  time: Date;

  @Field()
  sender: string;

  @Field()
  branchCode: string;

  @Field()
  partyCode: string;

  @Field()
  phone: string;

  @Field()
  content: string;

  @Field()
  status: string;

  @Field()
  type: string;
}
