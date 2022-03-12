import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs';

type Visitor = Readonly<GetResult>;

const getVisitor = async (): Promise<Visitor> =>
    await (await FingerprintJS.load()).get();

export default getVisitor;

export type { Visitor };
