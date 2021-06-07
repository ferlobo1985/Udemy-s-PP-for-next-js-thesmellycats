import * as Yup from 'yup';

export const showValidation = Yup.object({
    slug: Yup.string()
    .required('Sorry the slug is required'),
    title: Yup.string()
    .required('Sorry the title is required'),
    venue: Yup.string()
    .required('Sorry the venue is required'),
    excerpt: Yup.string()
    .required('Sorry the excerpt is required'),
    content:Yup.string()
    .required('Sorry the content is required'),
    yt:Yup.string()
    .required('Sorry the yt link is required'),
    date:Yup.string()
    .required('Sorry the date is required'),
    time:Yup.string()
    .required('Sorry the time is required')
})