class CheckLastEventStatusUseCase {
    constructor(private readonly loadLastEventRepository: LoadLastEventRepository) {}

    async execute(groupId: string): Promise<void> {
        await this.loadLastEventRepository.loadLastEvent(groupId)
    }
}

interface LoadLastEventRepository {
    loadLastEvent(groupId: string): Promise<void>
}

class LoadLastEventRepositoryFake implements LoadLastEventRepository {
    groupId?: string

    async loadLastEvent(groupId: string): Promise<void> {
        this.groupId = groupId
    }
}

describe('CheckLastEventStatusUseCase', () => {
    it('should get last event data', async () => {
        // Given / Arrange
        const groupIdDummy = 'dummy'
        const repository = new LoadLastEventRepositoryFake()
        const sut = new CheckLastEventStatusUseCase(repository)

        // When / Act
        await sut.execute(groupIdDummy)

        // Assert / Then
        expect(repository.groupId).toBe(groupIdDummy)
    })
})