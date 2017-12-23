declare interface MessageHandler {}

declare interface HandlerCondition {
  willHandle: boolean;
  continueProcess: boolean;
}
