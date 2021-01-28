import React, { Component } from 'react';
import axios from 'axios';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './CentralEditor.css';

class CentralEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
		this.saveEditorContentToDB();
	}

	componentDidMount() {
		this.hydrateEditorContentWithDB();

		window.addEventListener(
			"beforeunload",
			this.saveEditorContentToDB.bind(this)
		);

		this.interval = setInterval(() => {
			this.hydrateEditorContentWithDB();
		}, 60000)
	}

	componentWillUnmount() {
		window.removeEventListener(
			"beforeunload",
			this.saveEditorContentToDB.bind(this)
		);

		this.saveEditorContentToDB();
	}

	hydrateEditorContentWithDB() {
		axios.get('/central-editor/get-editor')
		.then((response) =>{
			if (response.data.editorContent) {
				let editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.editorContent)));
				this.setState({ editorState: editorState });
			} else {
				this.setState(EditorState.createEmpty());
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}

	saveEditorContentToDB() {
		axios.post('/central-editor/save', {
			'editorContent': JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
		})
		.catch((error) => {
			console.log(error);
		})
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
				wrapperClassName="CentralEditor-wrapper"
				editorClassName="CentralEditor-editor"
				onEditorStateChange={this.onEditorStateChange}
				editorState={this.state.editorState}
			/>
		)
	}
}

export default CentralEditor;