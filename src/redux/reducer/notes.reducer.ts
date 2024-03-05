import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import ContentService, { BaseResponse } from "../service/content.service"

type NotesDataType = {
    _id: string,
    userId: string,
    title: string,
    about: string,
    semester: string,
    subject: string,
    unit: string,
    chapter: string,
    mediaLink: string,
    imageLink: string,
}
type InitialStateType = {
    loading: boolean,
    data: NotesDataType[],
    error: string | null,
    pagination: {
        canGetMore: boolean
        limit: number
        totalCount: number
        skip: number
    },
}
const initialState: InitialStateType = {
    loading: true,
    data: [],
    error: null,
    pagination: {
        canGetMore: false,
        limit: 10,
        totalCount: 0,
        skip: 0
    },
}

export type ResponseType = {
    result: NotesDataType[],
    totalCount: number,
    skip: number,
    limit: number
}

export const getNotes = createAsyncThunk<BaseResponse<ResponseType>, void, { state: RootState }>("notes/getNotes", async (_, thunkApi) => {
    const { skip, limit } = thunkApi.getState().notesReducer.pagination;
    const data = await ContentService.getNotes(skip, limit);
    if (data.status !== "success") throw new Error(data.message ?? "Notes went wrong");
    return data;
})

const notesSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder.addCase(getNotes.pending, (state) => {
            state.loading = true
        })
            .addCase(getNotes.rejected, (state, action) => {
                state.loading = false
                state.error = action?.error?.message ?? null;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data?.result ?? []
                state.error = null
                state.pagination = {
                    canGetMore: (action?.payload?.data?.totalCount ?? 0) > (action?.payload?.data?.skip ?? 0),
                    limit: action?.payload?.data?.limit ?? 10,
                    totalCount: action?.payload?.data?.totalCount ?? 0,
                    skip: action?.payload?.data?.totalCount ?? 0,
                }
            })
    }
})

export const notesAction = notesSlice.actions
export const notesReducer = notesSlice.reducer
export const notesSelector = (root: RootState) => root.notesReducer;
// get type from notes

const paper = {
    "status": "success",
    "data": {
        "result": [
            {
                "_id": "63cc9e2ef399ca6752697a01",
                "userId": "63cc8c771d7dbcaf86d2dfbe",
                "title": "Wireless Communication End Term Examination",
                "about": "This file contains the questions that came in 7th Semester End Term Examination of Wireless Communication in December 2019 which comprises topics of all four units.",
                "semester": "7",
                "subject": "Wireless Communication",
                "unit": "3",
                "chapter": "2G, 2.5G and 3G Networks and Mobile Services",
                "topic": "PCS, GSM, CDMA, IMT 2000, WLL, and IRIDIUM System",
                "tags": [
                    "Unsolved",
                    "End-Term"
                ],
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674354220097End%20Term%202019%20WC.pdf?generation=1674354221883483&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674354222015End%20Term%202019%20WC.pdf_image.png?generation=1674354222860356&alt=media",
                "__v": 0
            },
            {
                "_id": "63cca058f399ca6752697a13",
                "userId": "63cc8c771d7dbcaf86d2dfbe",
                "title": "Wireless Communication Mid Term Examination",
                "about": "This file contains the questions which came in Wireless Communication Mid Term Examination happened in March 2020 which comprises of first two units.",
                "semester": "7",
                "subject": "Wireless Communication",
                "unit": "2",
                "chapter": "2G Networks and Introduction to Wireless Communication, PCS & Wireless Channels",
                "topic": "PCS, FDMA, TDMA, CDMA, Fading, GSM and PN Sequence",
                "tags": [
                    "Unsolved",
                    "Mid-Term"
                ],
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674354772321Mid%20Term%202020%20WC.pdf?generation=1674354774414110&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674354774541Mid%20Term%202020%20WC.pdf_image.png?generation=1674354775981253&alt=media",
                "__v": 0
            },
            {
                "_id": "63cca1d3f399ca6752697a1c",
                "userId": "63cc8c771d7dbcaf86d2dfbe",
                "title": "Database Management System Mid Term Examination",
                "about": "This file contains the questions of Mid Term Examination happened in March 2020 comprises of first two units.",
                "semester": "4",
                "subject": "Database Management System",
                "unit": "1",
                "chapter": "Introductory Concepts of DBMS and Relational Model",
                "topic": "DCL, DML, PL/SQL, E-R Diagram, Relational Algebra Operations",
                "tags": [
                    "Unsolved",
                    "Mid-Term"
                ],
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674355152050DBMS%2020%20MId%20Term.pdf?generation=1674355154180892&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674355154314DBMS%2020%20MId%20Term.pdf_image.png?generation=1674355155138779&alt=media",
                "__v": 0
            }
        ],
        "totalCount": 3,
        "skip": 0,
        "limit": 10
    }
}

const books = {
    "status": "success",
    "data": {
        "result": [
            {
                "_id": "63cca3f1f399ca6752697a25",
                "userId": "63cc8c771d7dbcaf86d2dfbe",
                "title": "Lecture Notes for Foundations of Computer Science",
                "about": "This book covers the syllabus of subject Foundation of Computer Science. This book are currently revised each year by John Bullinaria. They re based on an older version originally written by Martin Escardo and revised by Manfred Kerber. All are members of the School of Computer Science, University of Birmingham, UK.",
                "semester": "3",
                "tags": [
                    "Recommended by Teachers",
                    "Reference Book",
                    "Foreign Authors"
                ],
                "writer": [],
                "pages": 116,
                "bookEdition": 2018,
                "price": 700,
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674355694910foundations.pdf?generation=1674355696408767&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674355696534foundations.pdf_image.png?generation=1674355697450226&alt=media",
                "__v": 0
            },
            {
                "_id": "63cca4f1f399ca6752697a28",
                "userId": "63cc8c771d7dbcaf86d2dfbe",
                "title": "Lecture Notes for Data Structures and Algorithms",
                "about": "This book covers the entire syllabus of subject Data Structures and includes the topics like Stacks, Queues, Lists, Arrays, Trees, Binary Search Trees, Sorting, Graphs, Hash Tables and much more ...",
                "semester": "3",
                "tags": [
                    "Recommended by Teachers",
                    "Easy to understand",
                    "Reference Book",
                    "Foreign Authors"
                ],
                "writer": [],
                "pages": 126,
                "bookEdition": 2019,
                "price": 1500,
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674355950395dsa.pdf?generation=1674355951366018&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674355951495dsa.pdf_image.png?generation=1674355952928221&alt=media",
                "__v": 0
            }
        ],
        "totalCount": 2,
        "skip": 0,
        "limit": 10
    }
}

const file = {
    "status": "success",
    "data": {
        "result": [
            {
                "_id": "63cc4e11ed29c4d66974920e",
                "userId": "63cc47aced29c4d6697491d8",
                "title": "Data Structures Practical File",
                "about": "This file covered several experiments under the guidance of Dr Poonam Narang during 3rd Semester in Batch 2019.                                                Experiments covered are:- 1. To insert an element at user defined position in a linear array.   2. To delete an element from user defined from a linear array.   3. To search an element from linear array using linear array.   4. To search an element from linear array using linear array.    5. To sort linear array using bubble sort algorithm.    6. To create singly linked list with nodes having information about student and perform Insertion, Deletion and Reversal.    7. To create doubly linked list with nodes having information about the employee and perform Insertion, Deletion in list.  8. To create circular linked list with nodes having information about student and perform Insertion, Deletion in circular linked list.    9. To implement sparse matrix using array and store it in the sparse matrix form.    10. To create a stack and perform Pop and Push operations on the stack using array  and many more ......",
                "subject": "Data Structures",
                "college": "Guru Tegh Bahadur Institute of Technology",
                "semester": "3",
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674333709005DS%20prac%20file%201%20TO%2025.pdf?generation=1674333710941041&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674333711086DS%20prac%20file%201%20TO%2025.pdf_image.png?generation=1674333713186083&alt=media",
                "tags": [
                    "Handwritten",
                    "Printed",
                    "Computer Science"
                ],
                "__v": 0
            },
            {
                "_id": "63cc5200ed29c4d66974921d",
                "userId": "63cc47aced29c4d6697491d8",
                "title": "Data Mining and Business Intelligence Practical File",
                "about": "This practical file contains eight experiments under the guidance of Dr Divya Mam during 7th Semester in 2019 Batch. List of experiments are given below:-  1. Introduction to WEKA ;  2. To study about ETL process & its tools ; 3. To create an .arff file ; 4. Implementation of Classification technique on ARFF files using WEKA ; 5. Implementation of Clustering technique on ARFF files using WEKA ; 6. Implementation of Association Rule technique on ARFF files using WEKA; 7. To explore 2 graphs, view their ARFF files and apply an algorithm on them ; 8. To use Numeric Transform filter and floor function to obtain the precision up to same value.",
                "subject": "Data Mining and Business Intelligence",
                "college": "Guru Tegh Bahadur Institute of Technology",
                "semester": "7",
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674334716142DMBI%20Harshit%20Arora%20Practical%20File.pdf?generation=1674334718518233&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674334718646DMBI%20Harshit%20Arora%20Practical%20File.pdf_image.png?generation=1674334720799192&alt=media",
                "tags": [
                    "Printed",
                    "Computer Science"
                ],
                "__v": 0
            },
            {
                "_id": "63cc5518ed29c4d669749229",
                "userId": "63cc47aced29c4d6697491d8",
                "title": "Information Security Practical File",
                "about": "This practical file contains eight experiments under the guidance of Dr Divya Mam during the 7th Semester in 2019 Batch. List of experiments are given below:- 1. Make an experiment to implement WEP/WPA 2 PSK, 802.1x EAP Security Protocol ; 2. To implement Windows Firewall to login into bank site ; 3. Implement RSA Algorithm ; 4. Implement DES Algorithm ; 5. Implement Diffie-Hellman Algorithm ; 6. Make a study of anyone simulation tool based on parameters of information security ; 7. Implement VPN through Packet Tracer or any other network simulator tool ; 8. Write a program to perform Encryption/Decryption using Hill Cipher techniques.",
                "subject": "Information Security",
                "college": "Guru Tegh Bahadur Institute of Technology",
                "semester": "7",
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674335509263is%20file%20harshit.pdf?generation=1674335511074401&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674335511204is%20file%20harshit.pdf_image.png?generation=1674335511975543&alt=media",
                "tags": [
                    "Printed",
                    "Computer Science"
                ],
                "__v": 0
            }
        ],
        "totalCount": 3,
        "skip": 0,
        "limit": 10
    }
}

const jobs = {
    "status": "success",
    "data": {
        "result": [
            {
                "_id": "63cbf00bee4cc5105bab587d",
                "userId": "63c975cd68de67efc5ccf977",
                "title": "Software Test Engineer Silicon Software",
                "profile": "In this role, you will focus on testing of system software. You will partner with cross functional teams to deliver high quality, power and performance optimized software to enable the best user experience on Pixel and other hardware products. The Silicon Software team builds firmware, drivers, runtime, and compilers to bring our custom hardware to life. We work cross-functionally with many teams, including Research, Machine Learning, Android, Chrome, and Hardware. You will bring enthusiasm for software testing and expertise in embedded to implement testing strategies, promote good software engineering practices, and build out our testing infrastructure and test content. Our testing needs range from traditional software tests to complex on-device testing of full Android applications.\n\nGoogle's mission is to organize the world's information and make it universally accessible and useful. Our team combines the best of Google AI, Software, and Hardware to create radically helpful experiences. We research, design, and develop new technologies and hardware to make computing faster, seamless, and more powerful. We aim to make people's lives better through technology.",
                "company": "Google",
                "aboutCompany": "A problem isn't truly solved until it's solved for all. Googlers build products that help create opportunities for everyone, whether down the street or across the globe. Bring your insight, imagination and a healthy disregard for the impossible. Bring everything that makes you unique. Together, we can build for everyone.",
                "location": "Gurgoan",
                "jobType": "Full Time",
                "experienceLevel": "Mid-Senior Level",
                "datePosted": "1/21/2023",
                "skillsNeeded": [
                    "C/C++",
                    "HTML",
                    "Java",
                    "JS"
                ],
                "expectedSalary": 1000000,
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/IMG-20230121-WA0001.jpg?generation=1674309642522134&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/image_picker8073532514848290512.jpg?generation=1674309643396562&alt=media",
                "__v": 0
            },
            {
                "_id": "63d0b515a266bbde230c5129",
                "userId": "63d0b2c2a266bbde230c5123",
                "title": "Virtual Customer Service",
                "profile": "An Amazon Customer Service Associate is a critical part of our mission to deliver timely, accurate and professional customer service to all Amazon customers. This vital position requires an action-oriented, flexible problem-solver who will assist customers in expediting orders and correcting post-sales problems. Associates communicate with customers primarily through mail, chat and phone and utilize a variety of software tools to navigate customer accounts, research and review policies and communicate effective solutions in a fun and fast-paced environment.",
                "company": "Amazon",
                "aboutCompany": "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. We are driven by the excitement of building technologies, inventing products, and providing services that change lives. We embrace new ways of doing things, make decisions quickly, and are not afraid to fail. We have the scope and capabilities of a large company, and the spirit and heart of a small one.",
                "location": "Pune",
                "jobType": "Full Time",
                "experienceLevel": "Associate",
                "datePosted": "1/25/2023",
                "skillsNeeded": [
                    "Java",
                    "C/C++"
                ],
                "expectedSalary": 5000,
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674622226566IMG-20230125-WA0003.jpg?generation=1674622227472171&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674622227605IMG-20230125-WA0004.jpg?generation=1674622229085188&alt=media",
                "__v": 0
            },
            {
                "_id": "63d0b552a266bbde230c5135",
                "userId": "63d0b210a266bbde230c511a",
                "title": "Senior Data Engineer",
                "profile": "Our CST Engineering team is growing.  We are looking for a Senior Data Engineer to join our team and help deliver on our vision of creating a safer digital experience for every person and organization on the planet, which in turn, promotes trust in Microsoft.",
                "company": "Microsoft",
                "aboutCompany": "Microsoft runs on trust.  Earning and keeping that trust has never been more important.\n\n \n\nIn Customer Security and Trust (CST), program managers, engineers, analysts, investigators, data scientists, attorneys, and business professionals are responsible for some of the most exciting projects at Microsoft focused on protecting our customers. \n\nWe actively partner with law enforcement and security organizations around the globe to disrupt bad actors who are using malware, phishing scams, IP abuse, tech support fraud, and other means to target our customers.\nWe ensure that governments who are requesting data from Microsoft in support of their criminal investigations through legal orders follow due process, striking a balance between fighting cybercrime and protecting customer data. \nWe provide solutions to demonstrate that Microsoft is in compliance with cybersecurity practices in support of government and industry customers.",
                "location": "Hyderabad",
                "jobType": "Full Time",
                "experienceLevel": "Mid-Senior Level",
                "datePosted": "1/25/2023",
                "skillsNeeded": [
                    "C/C++",
                    "Java"
                ],
                "expectedSalary": 2500000,
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674622288220images.jpeg?generation=1674622289020171&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674622289144images%20(1).jpeg?generation=1674622289925268&alt=media",
                "__v": 0
            }
        ],
        "totalCount": 3,
        "skip": 0,
        "limit": 10
    }
}

export const PaperData = paper.data;
export const BooksData = books.data;
export const PracticalData = file.data;
export const JobsData = jobs.data;