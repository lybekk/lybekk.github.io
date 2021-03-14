declare module 'glob';

interface Content {
	published: ParsedContent[];
	unpublished?: string[];
	unknowns?: string[];
}

interface ParsedContent {
	data: {
		public?: boolean
	}
}

interface ContentTransformerOptions {
	contentSourceDirectory: string
	developmentMode: boolean
}

interface ContentStates {
	isPublished: boolean;
	isUnpublished: boolean;
}
