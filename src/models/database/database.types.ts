export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: number;
                    email: string;
                    password: string;
                    created_at: string;
                };
                Insert: {
                    id?: never;
                    email: string;
                    password: string;
                    created_at?: string;
                };
                Update: {
                    id?: never;
                    email?: string;
                    password?: string;
                };
            };
            users_information: {
                Row: {
                    id: number;
                    user_id: number; 
                    first_name: string;
                    middle_name?: string; 
                    last_name: string;
                };
                Insert: {
                    id?: never;
                    user_id: number; 
                    first_name: string;
                    middle_name?: string;
                    last_name: string;
                };
                Update: {
                    id?: never;
                    user_id?: number; 
                    first_name?: string;
                    middle_name?: string;
                    last_name?: string;
                };
            };
        };
    };
}
