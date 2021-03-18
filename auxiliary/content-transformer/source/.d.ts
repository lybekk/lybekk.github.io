declare module 'glob';

interface Content {
	published: Post[];
	unpublished: Post[];
	unknowns: Post[];
}

interface ContentTransformerOptions {
	contentSourceDirectory: string
	developmentMode: boolean
}

interface ContentStates {
	isPublished: boolean;
	isUnpublished: boolean;
}
