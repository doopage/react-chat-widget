import React$1 from 'react';
import { ComponentType, ElementType, Ref } from 'react';
import { Optional, Primitive } from 'utility-types';

declare const defaultProps$1: {
	showTimeStamp: boolean;
};
declare const defaultProps$2: {
	placeholder: string;
	buttonAlt: string;
	autofocus: boolean;
	disabledInput: boolean;
	allowSend: boolean;
};
declare const defaultProps$3: {
	resizableProps: ResizableProps;
	defaultSize: {
		width: number;
		height: number;
	};
};
declare const defaultProps$4: {
	chatId: string;
	openLabel: string;
	closeLabel: string;
	showBadge: boolean;
};
declare const defaultProps$5: {
	fullScreenMode: boolean;
	imagePreview: boolean;
	zoomStep: number;
};
declare const defaultProps$6: {
	primaryColor: string;
	messageClientColor: string;
	messageClientTextColor: string;
	messageResponseColor: string;
	messageResponseTextColor: string;
};
declare const defaultProps: {
	title: string;
	showCloseButton: boolean;
};
declare function Message$1({ message, showTimeStamp }: Props$8): import("react/jsx-runtime").JSX.Element;
declare function Root({ widgetProps, primaryColor, messageClientColor, messageClientTextColor, messageResponseColor, messageResponseTextColor, headerPaddingTop, headerPaddingBottom }: IProps$1): import("react/jsx-runtime").JSX.Element;
declare function Snippet({ message, showTimeStamp }: Props$9): import("react/jsx-runtime").JSX.Element;
declare namespace Root {
	var defaultProps: {
		primaryColor: string;
		messageClientColor: string;
		messageClientTextColor: string;
		messageResponseColor: string;
		messageResponseTextColor: string;
	};
}
export declare const Component: {
	Message: typeof Message$1;
	Snippet: typeof Snippet;
};
export declare const MESSAGES_TYPES: {
	TEXT: string;
	FILES: string;
	SNIPPET: {
		LINK: string;
	};
	CUSTOM_COMPONENT: string;
};
export declare const MESSAGE_BOX_SCROLL_DURATION = 400;
export declare const MESSAGE_SENDER: {
	CLIENT: string;
	RESPONSE: string;
};
export declare const ref: <T extends object>(v: T) => StateRef<T>;
export declare const useSelector: <T>(selector: (state: Snapshot<GlobalState>) => T) => T;
export declare function addLinkSnippet(link: LinkParams, id?: string, props?: any): void;
export declare function addResponseMessage(text: string, { id, status, props }?: MessageOptions): void;
export declare function addUserMessage(text: string, { id, status, props }?: MessageOptions): void;
export declare function closeFullscreenPreview(): void;
export declare function createComponentMessage(component: React$1.ComponentType, props: any, showAvatar: boolean, id?: string): CustomCompMessage;
export declare function createLinkSnippet(link: LinkParams, id?: string, props?: any): Link;
export declare function createNewMessage(text: string, sender: string, id?: string, status?: string, props?: any): MessageTypes;
export declare function createQuickButton(button: {
	label: string;
	value: string | number;
}): QuickButtonTypes;
export declare function deleteMessages(count: number, id?: string): void;
export declare function dropMessages(): void;
export declare function hideAvatar(index: number): void;
export declare function isWidgetOpened(): boolean;
export declare function markAllMessagesRead(): void;
export declare function openFullscreenPreview(payload: ImageState): void;
export declare function renderCustomComponent(component: React$1.ComponentType, props: any, showAvatar: boolean, id?: string): void;
export declare function scrollToBottom(messagesDiv: HTMLDivElement | null): void;
export declare function setBadgeCount(count: number): void;
export declare function setMessageStatus(id: string, status: string, props?: any): boolean;
export declare function setMessages(messages: Message[]): void;
export declare function setQuickButtons(buttons: Array<{
	label: string;
	value: string | number;
}>): void;
export declare function toggleChat(): void;
export declare function toggleInputDisabled(): void;
export declare function toggleMsgLoader(): void;
export interface BehaviorState {
	showChat: boolean;
	disabledInput: boolean;
	messageLoader: boolean;
}
export interface CustomCompMessage extends BaseMessage {
	props: any;
}
export interface FullscreenPreviewState extends ImageState {
	visible?: boolean;
}
export interface GlobalState {
	messages: MessagesState;
	behavior: BehaviorState;
	quickButtons: QuickButtonsState;
	preview: FullscreenPreviewState;
}
export interface ISenderRef {
	onSelectEmoji: (event: any) => void;
}
export interface ImageState {
	src: string;
	alt?: string;
	width: number;
	height: number;
}
export interface Link extends BaseMessage {
	title: string;
	link: string;
	target: string;
}
export interface LinkParams {
	link: string;
	title: string;
	target?: string;
}
export interface MessageTypes extends BaseMessage {
	text: string;
}
export interface MessagesState {
	responseUser: ResponseUser | null;
	messages: Message[];
	badgeCount: number;
}
export interface QuickButtonsState {
	quickButtons: QuickButtonTypes[];
}
export interface ResizableProps {
	heightOffset?: number;
	widthOffset?: number;
}
export type AnyFunction = (...args: any[]) => any;
export type BaseMessage = {
	type: string;
	component: StateRef<React$1.ElementType>;
	sender: string;
	showAvatar: boolean;
	profileAvatar?: string;
	timestamp: Date;
	status?: string;
	unread: boolean;
	customId?: string;
	props?: any;
};
export type CProps = {
	title: string;
	subtitle?: string;
	toggleChat?: () => void;
	showCloseButton: boolean;
	titleAvatar?: string;
};
export type IProps = CProps & typeof defaultProps;
export type Message = MessageTypes | Link | CustomCompMessage;
export type MessageOptions = {
	id?: string;
	status?: string;
	props?: any;
};
export type Nullable<T> = T | null;
export type Props = Optional<IProps, keyof typeof defaultProps>;
export type QuickButtonTypes = {
	label: string;
	value: string | number;
	component: StateRef<React$1.ElementType>;
};
export type ResponseUser = {
	avatar: string;
	name: string;
	message?: string;
	online?: boolean;
};
export type Snapshot<T> = T extends StateRef<infer S> ? S : T extends SnapshotIgnore ? T : T extends Promise<unknown> ? Awaited<T> : T extends object ? {
	readonly [K in keyof T]: Snapshot<T[K]>;
} : T;
export type SnapshotIgnore = Date | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any> | Error | RegExp | AnyFunction | Primitive;
export type StateRef<T> = T & {
	$$valtioSnapshot: T;
};
type CProps$1 = {
	showTimeStamp: boolean;
	profileAvatar?: string;
	profileClientAvatar?: string;
};
type CProps$2 = {
	senderRef?: React$1.Ref<ISenderRef>;
	placeholder: string;
	disabledInput: boolean;
	allowSend: boolean;
	autofocus: boolean;
	sendMessage: (event: string) => void;
	buttonAlt: string;
	onPressEmoji: (() => void) | null;
	onPressFile: (() => void) | null;
	onTextInputChange?: (event: any) => void;
};
type CProps$3 = {
	headerProps?: Props;
	messagesProps?: Props$1;
	senderProps?: Omit<Props$2, "sendMessage" | "onPressEmoji" | "onPressFile" | "disabledInput" | "allowSend">;
	quickButtonsProps?: Props$3;
	className?: string;
	sendMessage?: (data: {
		text?: string;
		files?: File[];
	}) => void;
	resizable?: boolean;
	resizableProps?: ResizableProps;
	defaultSize?: {
		width: number;
		height: number;
	};
	onResize?: (w: number, h: number) => void;
	emojis?: boolean;
	files?: boolean;
	disabledInput?: boolean;
};
type CProps$4 = {
	toggle: () => void;
	chatId: string;
	openLabel: string;
	closeLabel: string;
	closeImg?: string;
	openImg?: string;
	showBadge?: boolean;
};
type CProps$5 = {
	rootRef?: React$1.Ref<HTMLDivElement>;
	conversationProps?: Props$4;
	launcherProps?: Omit<Props$5, "toggle">;
	onToggleConversation: () => void;
	fullScreenMode?: boolean;
	customLauncher?: AnyFunction;
	imagePreview?: boolean;
	zoomStep?: number;
};
type CProps$6 = {
	widgetProps: Props$7;
	primaryColor?: string;
	messageClientColor?: string;
	messageClientTextColor?: string;
	messageResponseColor?: string;
	messageResponseTextColor?: string;
	headerPaddingTop?: string;
	headerPaddingBottom?: string;
};
type IProps$1 = CProps$6 & typeof defaultProps$6;
type Props$1 = Optional<CProps$1, keyof typeof defaultProps$1>;
type Props$2 = Optional<CProps$2, keyof typeof defaultProps$2>;
type Props$3 = {
	onQuickButtonClicked?: AnyFunction;
};
type Props$4 = Optional<CProps$3, keyof typeof defaultProps$3>;
type Props$5 = Optional<CProps$4, keyof typeof defaultProps$4>;
type Props$6 = Optional<CProps$5, keyof typeof defaultProps$5>;
type Props$7 = {
	layoutProps?: Omit<Props$6, "onToggleConversation" | "onSendMessage" | "onQuickButtonClicked" | "onTextInputChange">;
	handleNewUserMessage: (data: {
		text?: string;
		files?: File[];
	}) => void | Promise<void>;
	handleQuickButtonClicked?: AnyFunction;
	handleTextInputChange?: (event: any) => void;
	disableRichTextInput?: boolean;
	handleToggle?: (state: boolean) => Promise<boolean>;
	handleSubmit?: (data: {
		text?: string;
		files?: File[];
	}) => void | Error | Promise<void | Error>;
	onResize?: (w: number, h: number) => void;
};
type Props$8 = {
	message: MessageTypes;
	showTimeStamp: boolean;
};
type Props$9 = {
	message: Link;
	showTimeStamp: boolean;
};

export {
	Root as default,
};

