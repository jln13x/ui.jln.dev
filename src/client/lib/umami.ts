/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line no-var
declare var umami: umami.umami;

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace umami {
  interface umami {
    track(): Promise<string> | undefined;
    track(
      event_name: string,
      event_data?: Record<string, any>,
    ): Promise<string> | undefined;
    track(custom_payload: {
      website: string;
      [key: string]: any;
    }): Promise<string> | undefined;
    track(
      callback: (props: {
        hostname: string;
        language: string;
        referrer: string;
        screen: string;
        title: string;
        url: string;
        website: string;
      }) => { website: string; [key: string]: any },
    ): Promise<string> | undefined;
  }
}
