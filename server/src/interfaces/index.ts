export interface DataTypes {
    UUID: string;
    UUIDV4(): string;
    STRING: string;
    BOOLEAN: boolean;
    TEXT: string;
    INTEGER: number;
    DATE: string;
    FLOAT: number;
}

export interface Models {
    User: any;
    Product: any;
    sequelize: any;
}
