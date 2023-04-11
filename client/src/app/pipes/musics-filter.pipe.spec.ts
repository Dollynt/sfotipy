import { MusicsFilterPipe } from './musics-filter.pipe';
import { Music } from '../../../../common/music';

describe('MusicsFilterPipe', () => {
  let pipe: MusicsFilterPipe;
  const mockMusic1: Music = <Music>{ id: 1, name: 'music1', category: 1 };
  const mockMusic2: Music = <Music>{ id: 2, name: 'music2', category: 2 };
  const mockMusic3: Music = <Music>{ id: 3, name: 'music3', category: 1 };
  const mockMusic4: Music = <Music>{ id: 4, name: 'music4', category: 3 };
  const mockMusics: Music[] = [mockMusic1, mockMusic2, mockMusic3, mockMusic4];

  beforeEach(() => {
    pipe = new MusicsFilterPipe();
  });

  it('should return all musics if no filter is applied', () => {
    const result = pipe.transform(mockMusics, '', []);
    expect(result).toEqual(mockMusics);
  });

  it('should return all musics containing filter text', () => {
    const result = pipe.transform(mockMusics, 'muS', []);
    expect(result).toEqual([mockMusic1, mockMusic2, mockMusic3, mockMusic4]);
  });

  it('should return all musics with selected categories', () => {
    const result = pipe.transform(mockMusics, '', [1, 3]);
    expect(result).toEqual([mockMusic1, mockMusic3, mockMusic4]);
  });

  it('should return musics containing filter text and with selected categories', () => {
    const result = pipe.transform(mockMusics, 'c2', [2]);
    expect(result).toEqual([mockMusic2]);
  });

  it('should return an empty array if there are no musics', () => {
    const result = pipe.transform([], '', []);
    expect(result).toEqual([]);
  });
});