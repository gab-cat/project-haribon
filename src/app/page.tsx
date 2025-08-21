'use client';

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ImageUploader } from "@/components/ui/image-uploader";
import { useState } from "react";
import { toast } from "sonner";

interface UploadedFile {
  key: string;
  url: string;
  timestamp: number;
}

export default function Home() {
  const users = useQuery(api.users.api.getUsers, {
    paginationOpts: {
      numItems: 10,
      cursor: null,
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleUploadComplete = (key: string, url: string) => {
    const newFile: UploadedFile = {
      key,
      url,
      timestamp: Date.now(),
    };
    setUploadedFiles(prev => [newFile, ...prev]);
    toast.success(`File uploaded successfully! Key: ${key}`);
  };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Project Haribon</h1>
          <p className="text-lg text-gray-600">Demo: Image Upload with Compression</p>
        </div>

        {/* Image Uploader Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Upload & Compress Images
            </h2>
            <p className="text-gray-600">
              Select an image and it will be automatically compressed to WebP format before uploading to Cloudflare R2
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border">
            <ImageUploader
              onUploadComplete={handleUploadComplete}
              maxFileSize={10} // 10MB limit
              className="w-full"
            />
          </div>
        </section>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Recently Uploaded Files</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {uploadedFiles.map((file) => (
                <div key={file.key} className="bg-white rounded-lg shadow-md p-4 border">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700 truncate">
                      Key: {file.key}
                    </div>
                    <div className="text-xs text-gray-500">
                      Uploaded: {new Date(file.timestamp).toLocaleString()}
                    </div>
                    <div className="text-xs bg-gray-100 p-2 rounded font-mono break-all">
                      {file.url}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Users Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Users</h3>
          <div className="grid gap-2">
            {users?.page.map((user) => (
              <div key={user._id} className="bg-gray-50 rounded-lg p-3 text-gray-700">
                {user.email}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
