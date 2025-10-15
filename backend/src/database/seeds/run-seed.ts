import { AppDataSource } from '../data-source';
import { MockDataSeed } from './mock-data.seed';

async function runSeed() {
  const dataSource = AppDataSource;

  try {
    await dataSource.initialize();
    console.log('📡 Conexão com banco de dados estabelecida');

    const seedService = new MockDataSeed(dataSource);
    await seedService.run();

    console.log('🎉 Seed executado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Conexão com banco de dados finalizada');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runSeed();
}

export default runSeed;
