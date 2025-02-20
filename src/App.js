import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CircularProgress, TextField, Button, Card, CardContent, Typography } from "@mui/material";

function App() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState("");
  const [error, setError] = useState("");

  const fetchArticle = async () => {
    if (!topic.trim()) return alert("Please enter a topic!");
    
    setLoading(true);
    try {
        const response = await fetch(`https://ai-article-generator-backend.onrender.com/generate-article`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        });

        const data = await response.json();
        setArticle(data.article || "Failed to generate article.");
    } catch (error) {
        console.error("Error fetching article:", error);
        setArticle("Error fetching article.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full"
      >
        <Typography variant="h4" className="text-center mb-6 font-bold">
          AI Article Generator 📝
        </Typography>

        <div className="flex flex-col items-center space-y-4">
          <TextField
            label="Enter a Topic"
            variant="outlined"
            fullWidth
            className="bg-white rounded-lg"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={fetchArticle} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Article"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {article && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <Card className="bg-gray-800 text-white">
              <CardContent>
                <Typography variant="h6">Generated Article</Typography>
                <Typography variant="body1" className="mt-2">{article}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
