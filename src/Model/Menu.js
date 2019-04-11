// @flow
import FileDetails from './FileDetails';

const getFileDetails = (filename: string): FileDetails => {
    return new FileDetails(filename);
};

export default [
    {
        header: 'Site A11y',
        content: 'Generates accessibility reports for a domain.'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'domain',
                type: String,
                typeLabel: '[underline]{www.domain.com}',
                description: '(Required) Domain to run a11y reports on.'
            },
            {
                name: 'output',
                type: getFileDetails,
                typeLabel: '[underline]{file}',
                description: '(Required) Folder to output the reports to.'
            },
            {
                name: 'verbose',
                defaultValue: false,
                type: Boolean,
                description: 'Output information on the reporting.'
            },
            {
                name: 'remote',
                defaultValue: false,
                type: Boolean,
                description: 'Use url from index else html from index will be used.'
            },
            {
                name: 'help',
                type: Boolean,
                description: 'Print this usage guide.'
            }
        ]
    }
];