import React$1 from 'react';
import { CSSProperties, ComponentType, ElementType, ReactElement, Ref } from 'react';
import { Primitive } from 'utility-types';

declare function Message$1({ message, showTimeStamp }: Props$3): import("react/jsx-runtime").JSX.Element;
declare function Message$2({ message, showTimeStamp, className, children }: Props$5): import("react/jsx-runtime").JSX.Element;
declare function Root({ widgetProps, primaryColor, messageClientColor, messageClientTextColor, messageResponseColor, messageResponseTextColor, anchorBottom, anchorRight, headerPaddingTop, headerPaddingBottom }: CProps$7): import("react/jsx-runtime").JSX.Element;
declare function Snippet({ message, showTimeStamp }: Props$4): import("react/jsx-runtime").JSX.Element;
export declare const Component: {
	Message: typeof Message$1;
	Snippet: typeof Snippet;
	Custom: typeof Message$2;
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
	SYSTEM: string;
};
export declare const ref: <T extends object>(v: T) => StateRef<T>;
export declare const useSelector: <T>(selector: (state: Snapshot<GlobalState>) => T) => T;
export declare function addLinkSnippet(link: LinkParams, id?: string, props?: any): void;
export declare function addResponseMessage(text: string, { id, status, props }?: MessageOptions, overrides?: Partial<MessageTypes>): void;
export declare function addSystemMessage(text: string, { id, status, props }?: MessageOptions, overrides?: Partial<MessageTypes>): void;
export declare function addToggleChatListener(f: (s: boolean) => void): () => void;
export declare function addUserMessage(text: string, { id, status, props }?: MessageOptions, overrides?: Partial<MessageTypes>): void;
export declare function closeFullscreenPreview(): void;
export declare function createComponentMessage(component: React$1.ComponentType, props: any, showAvatar: boolean, id?: string): CustomCompMessage;
export declare function createLinkSnippet(link: LinkParams, id?: string, props?: any): Link;
export declare function createNewMessage(text: string, sender: string, id?: string, status?: string, props?: any, overrides?: Partial<MessageTypes>): MessageTypes;
export declare function createQuickButton(button: {
	label: string;
	value: string | number;
}): QuickButtonTypes;
export declare function deleteMessages(count: number, id?: string): void;
export declare function dropMessages(): void;
export declare function hideAvatar(index: number): void;
export declare function hidePopup(): void;
export declare function hideSuggestions(): void;
export declare function isWidgetOpened(): boolean;
export declare function markAllMessagesRead(): void;
export declare function openFullscreenPreview(payload: ImageState): void;
export declare function renderCustomComponent(component: React$1.ComponentType, props: any, showAvatar: boolean, id?: string): void;
export declare function scrollToBottom(messagesDiv: HTMLDivElement | null): void;
export declare function setBadgeCount(count: number): void;
export declare function setMessageStatus(id: string, status: string, props?: any): boolean;
export declare function setMessages(messages: Message[]): void;
export declare function setPopupMessage(message: string | string[] | null): void;
export declare function setQuickButtons(buttons: Array<{
	label: string;
	value: string | number;
}>): void;
export declare function setResponseUser(user: ResponseUser): void;
export declare function setStatusLocale(locale: string): void;
export declare function setVoiceLocale(locale: string): void;
export declare function showPopup(component: React$1.FC, styles?: React$1.CSSProperties): void;
export declare function showSuggestions(right: Record<string, () => void>, bottom: Record<string, () => void>): void;
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
	popup: PopupState;
	suggestions: SuggestionsState;
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
	popupMessage: string | string[] | null;
	statusLocale?: string;
	voiceLocale?: string;
}
export interface PopupState {
	showPopup: boolean;
	styles: React$1.CSSProperties;
	component: StateRef<React$1.ElementType> | null;
}
export interface QuickButtonsState {
	quickButtons: QuickButtonTypes[];
}
export interface ResizableProps {
	heightOffset?: number;
	widthOffset?: number;
}
export interface SuggestionsState {
	showSuggestion: boolean;
	right: Record<string, () => void>;
	bottom: Record<string, () => void>;
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
	title?: string | React$1.ReactElement;
	subtitle?: string;
	showMenuButton?: boolean;
	showCloseButton?: boolean;
	titleAvatar?: string;
	menus?: Array<{
		icon: string;
		title: string | React$1.ReactElement;
		onClick?: () => void;
		selects?: Array<{
			icon?: string;
			title: string | React$1.ReactElement;
			onClick: () => void;
		}>;
	}>;
};
export type Message = MessageTypes | Link | CustomCompMessage;
export type MessageOptions = {
	id?: string;
	status?: string;
	props?: any;
};
export type Nullable<T> = T | null;
export type Props = {
	onQuickButtonClicked?: AnyFunction;
};
export type QuickButtonTypes = {
	label: string;
	value: string | number;
	component: StateRef<React$1.ElementType>;
};
export type ResponseUser = {
	avatar: string | string[];
	name?: string;
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
	onClick?: (text: string, next: () => void) => void;
};
type CProps$2 = {
	showTimeStamp?: boolean;
	profileAvatar?: string;
	profileClientAvatar?: string;
	suggestionsProps?: CProps$1;
};
type CProps$3 = {
	senderRef?: React$1.Ref<ISenderRef>;
	placeholder?: string;
	disabledInput?: boolean;
	allowSend: boolean;
	autofocus?: boolean;
	sendMessage: (event: string) => void;
	buttonAlt?: string;
	onPressEmoji: (() => void) | null;
	onPressFile: (() => void) | null;
	onTextInputChange?: (event: any) => void;
	onVoiceInputChange?: (text: string, isFinal: boolean) => void;
};
type CProps$4 = {
	headerProps?: CProps;
	messagesProps?: CProps$2;
	senderProps?: Omit<CProps$3, "sendMessage" | "onPressEmoji" | "onPressFile" | "disabledInput" | "allowSend">;
	quickButtonsProps?: Props;
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
	copyright?: string;
};
type CProps$5 = {
	toggle: () => void;
	chatId?: string;
	openLabel?: string;
	closeLabel?: string;
	closeImg?: string;
	openImg?: string;
	showBadge?: boolean;
	showPopup?: boolean;
	isLoading?: boolean;
	popupProps?: Omit<Props$1, "text">;
};
type CProps$6 = {
	rootRef?: React$1.Ref<HTMLDivElement>;
	conversationProps?: CProps$4;
	launcherProps?: Omit<CProps$5, "toggle" | "isLoading">;
	onToggleConversation: () => Promise<void>;
	fullScreenMode?: boolean;
	customLauncher?: AnyFunction;
	imagePreview?: boolean;
	zoomStep?: number;
};
type CProps$7 = {
	widgetProps: Props$2;
	primaryColor?: string;
	messageClientColor?: string;
	messageClientTextColor?: string;
	messageResponseColor?: string;
	messageResponseTextColor?: string;
	anchorBottom?: number | string;
	anchorRight?: number | string;
	headerPaddingTop?: string;
	headerPaddingBottom?: string;
};
type Props$1 = {
	text: string | readonly string[];
	onResize?: (w: number, h: number) => void;
};
type Props$2 = {
	layoutProps?: Omit<CProps$6, "onToggleConversation" | "onSendMessage" | "onQuickButtonClicked" | "onTextInputChange">;
	handleNewUserMessage?: (data: {
		text?: string;
		files?: File[];
	}) => void | Promise<void>;
	handleQuickButtonClicked?: AnyFunction;
	handleTextInputChange?: (event: any) => void;
	disableRichTextInput?: boolean;
	handleToggle?: (state: boolean) => boolean | Promise<boolean>;
	handleSubmit?: (data: {
		text?: string;
		files?: File[];
	}) => void | Error | Promise<void | Error>;
	onResize?: (w: number, h: number) => void;
};
type Props$3 = {
	message: MessageTypes;
	showTimeStamp: boolean;
};
type Props$4 = {
	message: Link;
	showTimeStamp: boolean;
};
type Props$5 = {
	message: MessageTypes;
	showTimeStamp: boolean;
	className: string;
	children?: React$1.ReactNode;
};

export {
	Root as default,
};

