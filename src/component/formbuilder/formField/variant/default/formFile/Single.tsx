import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Dialog, DialogContent } from '@mui/material';
import { RiUpload2Fill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { Field, FieldProps } from 'formik';
import { IFileFieldSetting, TFileInfo } from 'component/formbuilder/types';

export const Single: React.FC<IFileFieldSetting> = ({ label, value, options }) => {
  const [fileInfo, setFileInfo] = useState<TFileInfo | null>((value as TFileInfo) || null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Field name={label}>
      {({ field, form }: FieldProps) => {
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (file) {
            const fileURL = URL.createObjectURL(file);
            const newFileInfo = {
              fileName: file.name,
              fileSize: file.size,
              filePath: fileURL,
              isLocal: true,
              file,
            };
            setFileInfo(newFileInfo);
            form.setFieldValue(label, newFileInfo);
          }
        };

        const handleDelete = () => {
          if (fileInfo?.filePath) {
            URL.revokeObjectURL(fileInfo.filePath);
          }
          setFileInfo(null);
          form.setFieldValue(label, null);
        };

        const handleThumbnailClick = () => {
          if (fileInfo?.filePath) {
            setIsDialogOpen(true);
          }
        };

        const handleCloseDialog = () => {
          setIsDialogOpen(false);
        };

        return (
          <>
            <TextField
              label={label}
              variant="outlined"
              fullWidth
              value={fileInfo ? fileInfo.fileName : ''}
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: fileInfo?.filePath ? (
                    <InputAdornment position="start">
                      <img
                        src={fileInfo.filePath}
                        alt={fileInfo.fileName}
                        onClick={handleThumbnailClick}
                        style={{ height: '100%', maxHeight: '28px', borderRadius: '4px', marginRight: '8px', cursor: 'pointer' }}
                      />
                    </InputAdornment>
                  ) : null,
                  endAdornment: (
                    <InputAdornment position="end">
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e)}
                        id={`file-upload-${label}`}
                      />
                      {fileInfo && (
                        <IconButton onClick={() => handleDelete()} color="error">
                          <IoCloseSharp />
                        </IconButton>
                      )}
                      <label htmlFor={`file-upload-${label}`} style={{ margin: 0 }}>
                        <IconButton component="span">
                          <RiUpload2Fill />
                        </IconButton>
                      </label>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="lg">
              <DialogContent>
                <img
                  src={fileInfo?.filePath}
                  alt={fileInfo?.fileName}
                  style={{ maxHeight: '90vh', width: 'auto', display: 'block', margin: '0 auto' }}
                />
              </DialogContent>
            </Dialog>
          </>
        );
      }}
    </Field>
  );
};