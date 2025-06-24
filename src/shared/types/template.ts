export interface Template {
    id: string;
    name: string;
    subject: string;
    body: string;
    variables: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface TemplateVariables {
    [key: string]: string | number;
}