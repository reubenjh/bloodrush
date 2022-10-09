/* eslint-disable react/no-unescaped-entities */

const errorMessageMap: Record<string, string> = {
  OAuthAccountNotLinked:
    'A bloodrush account exists for this email, but it is linked to a different provider. For your security, we cant allow different providers to authenticate on behalf of the same email address. Please use the correct provider, otherwise sign in with email.',
  EmailSignin: 'Sending your verification token failed.',
  Default: 'An unknown error occurred.',
};

export const SigninError = ({
  error,
  hasTrpcError,
}: {
  error: string;
  hasTrpcError: boolean;
}) => {
  return (
    <>
      <div>Uh oh.</div>
      {error && (
        <div className="t.mt-2">
          {errorMessageMap[error as string] ?? errorMessageMap.Default}
        </div>
      )}
      {hasTrpcError && (
        <div className="t.mt-2">
          Looks like this issue is in our system. We've been notified and will
          hustle to get it sorted. Thanks for your patience.
        </div>
      )}
    </>
  );
};
