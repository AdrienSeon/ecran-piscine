import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EditeurCentral.css';

class EditeurCentral extends Component {
	constructor(props) {
		super(props);
		this.state = { };

		const editorContent = window.localStorage.getItem('editorContent');

		if (editorContent) {
			this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(editorContent)));
		} else {
			this.state.editorState = EditorState.createEmpty();
		}
	}

	onEditorStateChange = (editorState) => {
		const contentState = this.state.editorState.getCurrentContent();
		this.saveContent(contentState);
		this.setState({
			editorState,
		});
	}

	saveContent = (editorContent) => {
		window.localStorage.setItem('editorContent', JSON.stringify(convertToRaw(editorContent)));
	}

	render() {
		return (
			<Editor
				toolbarOnFocus
				toolbar={{
					options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'remove', 'history'],
					inline: {
						options: ['bold', 'italic', 'underline', 'strikethrough'],
					},
				}}
				localization={{
					locale: 'fr',
				}}
				wrapperClassName="EditeurCentral-wrapper"
				editorClassName="EditeurCentral-editor"
				onEditorStateChange={this.onEditorStateChange}
				editorState={this.state.editorState}
			/>
		)
	}
}

export default EditeurCentral;