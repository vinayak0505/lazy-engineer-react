import { Navigate, useParams } from 'react-router-dom';
import { NotesUploadComponent } from './NotesUploadComponent';
import { PaperUploadComponent } from './PaperUploadComponent';
import { FileUploadComponent } from './FileUploadComponent';
import { JobsUploadComponent } from './JobsUploadComponent';
import { BooksUploadComponent } from './BooksUploadComponent';

const UploadPage = () => {
	const { uploadType } = useParams();

	switch (uploadType) {
		case 'notes':
			return <NotesUploadComponent />;
		case 'papers':
			return <PaperUploadComponent />;
		case 'practicle':
			return <FileUploadComponent />;
		case 'books':
			return <BooksUploadComponent />;
		case 'jobs':
			return <JobsUploadComponent />;
		default:
			return <Navigate to="/login" replace />;
	}
};

export default UploadPage;
