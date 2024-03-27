import { Navigate, useParams } from 'react-router-dom';
import { NotesUploadComponent } from './NotesUploadComponent';
import { PaperUploadComponent } from './PaperUploadComponent';

const UploadPage = () => {
	const { uploadType } = useParams();

	switch (uploadType) {
		case 'notes':
			return <NotesUploadComponent />;
		case 'papers':
			return <PaperUploadComponent />;
		case 'practicle':
			return <NotesUploadComponent />;
		case 'books':
			return <NotesUploadComponent />;
		case 'jobs':
			return <NotesUploadComponent />;
		default:
			return <Navigate to="/login" replace />;
	}
};

export default UploadPage;
