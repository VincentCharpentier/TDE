interface IEventListener
{
    On(eventType: string, action: Function): void;
}

interface IEventDispatcher
{
    AddEventListener(listener: IEventListener): void;

    RemoveEventListener(listener: IEventListener): void;

    DispatchEvent(eventType: string): void;
}
