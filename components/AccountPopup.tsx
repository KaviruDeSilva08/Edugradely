'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AccountPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    username: string;
    email: string;
    password: string;
  };
}

export function AccountPopup({ isOpen, onClose, initialData }: AccountPopupProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialData || {
    username: 'User Name',
    email: 'User@gmail.com',
    password: 'Password123',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative z-50 bg-white rounded-2xl p-8 w-[400px]">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="absolute left-6 top-6 text-gray-500 hover:text-gray-700"
        >
          ←
        </button>

        <h2 className="text-2xl font-semibold text-center mb-8">Account Details</h2>

        {/* User Avatar */}
        <div className="w-24 h-24 rounded-full bg-[#F3D9BA] flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-white">
            {userData.username.substring(0, 2).toUpperCase()}
          </span>
        </div>

        <h3 className="text-xl text-center mb-6">{userData.username}</h3>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="relative">
            <Input
              value={userData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-full border"
            />
            {isEditing && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                ✏️
              </button>
            )}
          </div>

          <div className="relative">
            <Input
              value={userData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-full border"
            />
            {isEditing && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                ✏️
              </button>
            )}
          </div>

          <div className="relative">
            <Input
              type="password"
              value={userData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-full border"
            />
            {isEditing && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                ✏️
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={isEditing ? handleSave : handleEdit}
            className="flex-1 py-2 rounded-full"
            style={{
              backgroundColor: isEditing ? '#E5B47F' : '#F3D9BA',
              color: '#000000',
            }}
          >
            {isEditing ? 'Ok' : 'Edit'}
          </Button>
        </div>
      </div>
    </div>
  );
} 