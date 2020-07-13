// export class DateTransformer implements CustomTransformer<string, Date> {
//
//   public transform(input: string): Date {
//     return input != null ? new Date(input) : null
//   }
//
// }
//
// export class UserProfile {
//   avatar: string;
//   customerId: string;
//
//   public constructor(data: Partial<UserProfile> = {}) {
//     Object.assign(this, data);
//   }
// }
//
// export class User {
//   firstName: string;
//   lastName: string;
//   profile: UserProfile
//   createdAt: Date;
//   updatedAt: Date;
//   birthDate: Date;
//
//   public constructor(data: Partial<User> = {}) {
//     Object.assign(this, data);
//   }
// }
//
// export class UserData {
//   firstName: string;
//   name: string;
//   nickname: string;
//   creationDate: string;
//   updateDate: string;
//   birthDay: number;
//   birthMonth: number;
//   birthYear: number;
//   avatarUrl: string;
//   metadata: {
//     token: string;
//     customerId: string;
//   }
//
//   public constructor(data: Partial<UserData> = {}) {
//     Object.assign(this, data);
//   }
// }
//
// export class UserService {
//
//   @Mapper<UserData, User>(() => User, [
//     {source: 'firstName'},
//     {target: 'lastName', source: 'name'},
//     {target: 'createdAt', source: 'creationDate', customTransformer: () => DateTransformer},
//     {target: 'updatedAt', source: 'updateDate', transform: (value: string) => value != null ? new Date(value) : null},
//     {
//       target: 'birthDate', transform: (value: UserData) => {
//         return value.birthYear != null ? new Date(value.birthYear, value.birthMonth - 1, value.birthDay) : null;
//       }
//     },
//     {
//       target: 'profile',
//       type: () => UserProfile,
//       params: [
//         {target: 'avatar', source: 'avatarUrl'},
//         {target: 'customerId', source: 'metadata.customerId'},
//       ]
//     }
//   ])
//   public readonly mapTo: MapperFn<UserData, User>;
//
//   @ArrayMapperDecorator('mapTo')
//   public readonly mapToArray: ArrayMapperFn<UserData, User>;
//
//   @ArrayMapperDecorator(() => User, [
//     {source: 'firstName'}
//   ])
//   public readonly mapToArray2: ArrayMapperFn<UserData, User>;
//
// }