import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { authContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import '../CSS/Createpost.css';
import TurndownService from 'turndown';
const turndownService = new TurndownService();


export default function CreatePost() {
    const [Value, setValue] = useState('');
    const [Title, SetTitle] = useState('');
    const [Thumbnail, SetThumbnail] = useState('');
    const [Category, SetCategory] = useState('');
    const Auth = useContext(authContext);
    const navigate = useNavigate();

    function handleChange(event) {
        if (event.target.name === 'title') {
            SetTitle(event.target.value);
        } else if (event.target.name === 'category') {
            SetCategory(event.target.value);
        } else {
            setValue(event.target.value);
        }
    }

    function handleImage(event) {
        SetThumbnail(event.target.files[0]);
    }

    async function handlePost() {
        if (Category === '') {
            alert('Please select a category');
            return;
        }

        const markdownContent = turndownService.turndown(Value);

        const response = await fetch('http://localhost:5000/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + Auth.token,
                user: Auth.User,
            },
            body: JSON.stringify({
                user: Auth.User,
                title: Title,
                category: Category,
                thumbnail: Thumbnail,
                content:markdownContent,
            }),
        });

        const data = await response.json();

        if (data) {
            alert('Form created successfully');
            navigate('/feed');
        }
    }

    return Auth.token ? (
        <div className="container create-post-container">
            <h2>Create New Post</h2>

            <form className="create-post-form">
                {/* Title Input */}
                <div className="form-group mb-4">
                    <input
                        type="text"
                        placeholder="Enter post title"
                        value={Title}
                        name="title"
                        onChange={handleChange}
                        className="form-control custom-input"
                    />
                </div>

                {/* Thumbnail Upload */}
                <div className="mb-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="custom-file-input"
                    />
                </div>

                {/* Category Select */}
                <div className="form-group mb-5">
                    <select
                        name="category"
                        value={Category}
                        onChange={handleChange}
                        className="form-select custom-select"
                    >
                        <option value="">Select a category</option>
                        <option value="Technology">Technology</option>
                        <option value="Self Improvement">Self Improvement</option>
                        <option value="Health">Health</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Mental Health">Mental Health</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Relationships">Relationships</option>
                        <option value="AWS">AWS</option>
                        <option value="UX Design">UX Design</option>
                    </select>
                </div>

                {/* Quill Editor */}
                <div className="mb-5">
                    <ReactQuill theme="snow" value={Value} onChange={setValue} className="quill-editor" />
                </div>

                {/* Submit Button */}
                <button
                    className="btn btn-primary custom-btn"
                    type="button"
                    onClick={handlePost}
                >
                    Create Post
                </button>
            </form>
        </div>
    ) : (
        <Link to="/home"></Link>
    );
}
