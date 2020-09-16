/* eslint-disable no-console */
import React, { useState } from 'react';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File | string;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  async function handleUpload(): Promise<void> {
    try {
      const file = new FormData();

      uploadedFiles.map(f => {
        file.append('file', f.file, 'file.csv');
      });

      await api.post('/transactions/import', file);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  }

  function submitFile(files: File[]): void {
    const filesForUpload: FileProps[] = [];

    files.map(f => {
      filesForUpload.push({
        file: f,
        name: f.name,
        readableSize: filesize(f.size),
      });
    });

    setUploadedFiles(filesForUpload);
  }

  return (
    <>
      <Header size="small" pageGo="/" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Importar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
