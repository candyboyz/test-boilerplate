import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidCommentText(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string): void {
        registerDecorator({
            name: 'isValidCommentText',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: unknown, args: ValidationArguments): boolean {
                    const dto = args.object as { rating: number; text?: string };

                    if (dto.rating === undefined) {
                        return false;
                    }

                    if (dto.rating === 1 || dto.rating === 5) {
                        return true;
                    }

                    if (dto.rating >= 2 && dto.rating <= 4) {
                        return typeof value === 'string' && value.trim().length >= 10;
                    }

                    return false;
                },
                defaultMessage(args: ValidationArguments): string {
                    const dto = args.object as { rating: number };

                    if (dto.rating >= 2 && dto.rating <= 4) {
                        return `Comment text is required and must be at least 10 characters long when rating is ${dto.rating}`;
                    }

                    return 'Invalid comment data';
                },
            },
        });
    };
}

