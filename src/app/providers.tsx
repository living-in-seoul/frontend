import {
  RecoilProvider,
  SWRConfigContext,
  SSEProvider,
  ProgressBarProviders,
} from '@/context';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilProvider>
      <SWRConfigContext>
        <SSEProvider>
          <ProgressBarProviders>{children}</ProgressBarProviders>
        </SSEProvider>
      </SWRConfigContext>
    </RecoilProvider>
  );
};
export default Providers;
