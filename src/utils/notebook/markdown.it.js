import markdown from 'markdown-it';

export default markdown({ html: true, xhtmlOut: true, breaks: true, linkify: true });
