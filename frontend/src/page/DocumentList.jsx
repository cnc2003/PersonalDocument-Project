import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const {username } = useParams()
    
    const getDocuments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/documents`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDocuments(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {getDocuments()}, [])
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Document List</h1>
            <ul className="space-y-4">
                {documents.map((document) => (
                    <li key={document.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-2xl font-semibold">{document.title}</h2>
                        <p className="text-gray-600">{document.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;