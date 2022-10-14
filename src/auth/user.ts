import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User,
    Auth,
    GithubAuthProvider,
    reauthenticateWithPopup,
} from 'firebase/auth';
import { parseAsString } from 'parse-dont-validate';
import { parseNullableAsDefaultOrUndefined } from 'utari-common';
import utariAxios from '../config/axios';
import { app } from '../config/firebase';
import userAPI from '../url/mutation/user';

const auth = (() => {
    const auth = getAuth();
    auth.languageCode = 'it';
    return auth;
})();

const accountAction = (auth: Auth) => {
    if (!app) {
        throw new Error('firebase app is not initialized');
    }
    return (provider: GoogleAuthProvider | GithubAuthProvider) => ({
        signIn: async () => {
            try {
                const userCredential = await signInWithPopup(auth, provider);
                const credential = (
                    provider instanceof GoogleAuthProvider
                        ? GoogleAuthProvider
                        : GithubAuthProvider
                ).credentialFromResult(userCredential);
                if (!credential) {
                    throw new Error('credential cannot be null');
                }
                const { user } = userCredential;
                const {
                    metadata: { lastSignInTime, creationTime },
                } = user;
                await utariAxios.post(userAPI, {
                    data: {
                        token: await userCredential.user.getIdToken(true),
                        timeCreated: new Date(
                            parseAsString(creationTime).elseThrow(
                                `creationTime is not an ISO String, it is ${creationTime}`
                            )
                        ).toISOString(),
                    },
                    headers: {},
                });
                return {
                    type: 'succeed',
                    name: userCredential.user.displayName,
                    isFirstTime: lastSignInTime === creationTime,
                } as const;
            } catch (error: any) {
                return {
                    type: 'failed',
                    error,
                } as const;
            }
        },
        signOut: async () => {
            try {
                await auth.signOut();
                return {
                    type: 'succeed',
                } as const;
            } catch (error: any) {
                return {
                    type: 'failed',
                    error,
                } as const;
            }
        },
        delete: async (user: NonNullableUtariUser) => {
            try {
                const token = await user.getIdToken(true);
                await reauthenticateWithPopup(user, provider);
                await user.delete();
                await utariAxios.delete(`${userAPI}/?token=${token}`, {
                    headers: {},
                });
                return {
                    type: 'succeed',
                } as const;
            } catch (error: any) {
                return {
                    type: 'failed',
                    error,
                } as const;
            }
        },
    });
};

const setAuthProvider = accountAction(auth);
const github = setAuthProvider(new GithubAuthProvider());
const google = setAuthProvider(new GoogleAuthProvider());

const onUtariUserStateChanged = (setUser: (user: UtariUser) => void) =>
    onAuthStateChanged(auth, (user) =>
        setUser(parseNullableAsDefaultOrUndefined(user))
    );

type UtariUser = User | undefined;

type AuthResponse =
    | Readonly<{
          type: 'succeed';
          name: string | null;
          isFirstTime: boolean;
          error?: undefined;
      }>
    | Readonly<{
          type: 'failed';
          error: any;
          name?: undefined;
          isFirstTime?: undefined;
      }>;

type NonNullableUtariUser = NonNullable<UtariUser>;

export { google, onUtariUserStateChanged, auth, github };

export type { UtariUser, NonNullableUtariUser, AuthResponse };
