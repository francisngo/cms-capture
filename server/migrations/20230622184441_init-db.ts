import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('products', (table) => {
        table.specificType('id', 'CHAR(16)').primary();
        table.string('sku').notNullable().unique();
        table.string('name').notNullable();
        table.text('description');
        table.text('additionalInformation');
        table.text('specifications');
        table.integer('price').notNullable();
        table.string('priceId').notNullable();
        table.string('imageUrl');
        table.string('altImg');
        table.string('category').index();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('products');
}

