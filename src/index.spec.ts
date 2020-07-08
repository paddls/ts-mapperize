import {User, UserData, UserProfile, UserService} from './index';

describe('Mapper', () => {
  it('should test', () => {
    const userService: UserService = new UserService();

    const user: User = userService.mapTo(new UserData({
      firstName: 'Romain',
      name: 'MARTINEAU',
      nickname: 'CTO',
      updateDate: '2019-03-25',
      creationDate: '2012-09-27',
      birthDay: 30,
      birthMonth: 4,
      birthYear: 1992,
      avatarUrl: 'https://toto.com',
      metadata: {
        token: 'azerty',
        customerId: '123456z'
      }
    }));

    expect(user).toEqual(new User({
      firstName: 'Romain',
      lastName: 'MARTINEAU',
      createdAt: new Date('2012-09-27'),
      updatedAt: new Date('2019-03-25'),
      birthDate: new Date(1992, 3, 30),
      profile: new UserProfile({
        avatar: 'https://toto.com',
        customerId: '123456z'
      })
    }));
  });

  it('should test 2', () => {
    const userService: UserService = new UserService();

    const users: User[] = userService.mapToArray([
      new UserData({firstName: 'Thomas'}),
      new UserData({firstName: 'Romain'})
    ]);

    expect(users).toEqual([
      new User({firstName: 'Thomas', profile: new UserProfile()}),
      new User({firstName: 'Romain', profile: new UserProfile()})
    ]);
  });


  it('should test 3', () => {
    const userService: UserService = new UserService();

    const users: User[] = userService.mapToArray2([
      new UserData({firstName: 'Thomas'}),
      new UserData({firstName: 'Romain'})
    ]);

    expect(users).toEqual([
      new User({firstName: 'Thomas'}),
      new User({firstName: 'Romain'})
    ]);
  });
})